"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import InputRow from "./components/InputRow";
import InputField from "./components/InputField";
import { Tiro_Tamil } from "next/font/google";

export default function Home() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [initData, setInitData] = useState({
		id: Date.now(),
		name: "",
		productPrice: 0,
		qty: 0,
		total: 0,
	});

  const addRow = (e) => {
    e.preventDefault();
		let newData = {
			...initData,
			id: Date.now()
		};
    setData([...data, newData]);
  };

  const deleteRow = (id) => {
    setData(data.filter((item, i) => item.id != id));
  };

  const setInit = (data) => {
    setInitData(data);
  };

  const updateRow = (value) => {
    setData(data.map((item, i) => (item.id == value.id ? value : item)));
  };

	useEffect(() => {
		setTotal(data.reduce((a, b) => a + b.total, 0));
	}, [data, initData])

  return (
    <main className="container p-16">
      <form onSubmit={addRow}>
        <button className="bg-sky-500 py-2 px-6 rounded-md hover:bg-sky-700 mb-4 text-white">
          New
        </button>
        <ul role="list" className="divide-y divide-gray-100">
          <li>
            <InputRow
              data={initData}
              changeHandler={setInit}
            />
          </li>
        </ul>
      </form>
      <ul role="list" className="divide-y divide-gray-100">
        {data?.map((item, key) => (
          <li key={key} className="flex gap-x-6 py-5">
            <InputRow
              id={item.id}
              data={item}
              deletable={true}
              deleteRow={deleteRow}
              changeHandler={updateRow}
            />
          </li>
        ))}
      </ul>
      <div className="flex gap-x-6 grid-flow-col grid-cols-5 flex-row-reverse">
				<div className="col-end-1 col-auto mb-2">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Total {total}
					</label>
					<input
						type="number"
						id="totalAll"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={total}
						readOnly={true}
					/>
				</div>
      </div>
    </main>
  );
}
