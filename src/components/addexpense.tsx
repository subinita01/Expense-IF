import { useState } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { Category } from "@/types/expense";

const AddExpense = () => {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<Category>("other");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleAdd = async () => {
    if (!title || amount <= 0) {
      alert("Enter valid title and amount");
      return;
    }

    await addExpense({
      title,
      amount,
      category,
      date,
    });

    // reset form
    setTitle("");
    setAmount(0);
    setCategory("other");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="space-y-3">
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        className="border px-3 py-2 rounded w-full"
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value as Category)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
        <option value="shopping">Shopping</option>
        <option value="utilities">Utilities</option>
        <option value="health">Health</option>
        <option value="other">Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={handleAdd}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
