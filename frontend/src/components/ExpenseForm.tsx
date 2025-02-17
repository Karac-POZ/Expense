import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Transaction {
  dateTime: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
}

export default function ExpenseForm() {
  const [form, setForm] = useState<Transaction>({
    dateTime: "",
    author: "",
    sum: 0,
    category: "Food",
    comment: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>("http://localhost:3001/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [transactions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Transaction>("http://localhost:3001/api/transactions", form);
      setTransactions((prev) => [...prev, response.data]);
      setForm({ dateTime: "", author: "", sum: 0, category: "Food", comment: "" });
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container">
      <motion.h1 className="title" animate={{ scale: 1.1 }}>
        Expense Tracker
      </motion.h1>

      <motion.form onSubmit={handleSubmit} className="form-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <label>
          Date and Time:
          <input type="datetime-local" name="dateTime" value={form.dateTime} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Author:
          <input type="text" name="author" value={form.author} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Amount:
          <input type="number" name="sum" value={form.sum} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
          </select>
        </label>

        <label>
          Comment:
          <input type="text" name="comment" value={form.comment} onChange={handleChange} className="input-field" />
        </label>

        <button type="submit" className="submit-button">Save</button>
      </motion.form>

      <h2 className="subtitle">Transactions</h2>
      <motion.div ref={listRef} className="transaction-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ul>
          {transactions.map((transaction, index) => (
            <motion.li key={index} className="transaction-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {formatDate(transaction.dateTime)} - {transaction.author} - {transaction.sum} - {transaction.category} - {transaction.comment}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
