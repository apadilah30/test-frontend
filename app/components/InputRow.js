"use client";

import { useEffect, useState } from "react";
import InputField from "./InputField";

export default function InputRow({ data, changeHandler, deleteRow, deletable }) {
  const [row, setRow] = useState(data);
  const [id, setId] = useState(data.id ?? "");
  const [name, setName] = useState(data.name ?? "");
  const [productPrice, setProductPrice] = useState(
    data.productPrice ?? 0
  );
  const [qty, setQty] = useState(data.qty ?? 0);
  const [total, setTotal] = useState(data.total ?? 0);

  useEffect(() => {
    setRow({
      id: id,
      name: name,
      productPrice: productPrice,
      qty: qty,
      total: Number(qty) * Number(productPrice),
    });
  }, [name, productPrice, qty]);

  useEffect(() => {
    setTotal(row.total);
	}, [data]);
  
	useEffect(() => {
		changeHandler(row);
	}, [row]);

  return (
    <div className="grid grid-flow-col gap-3 w-full">
      <InputField
        type="text"
        label="Product Name"
        name="name"
        defaultValue={data.name}
        value={data.name}
        changeHandler={(val) => setName(val.target.value)}
      />
      <InputField
        type="number"
        label="Product Price"
        name="productPrice"
        defaultValue={data.productPrice}
        value={data.productPrice}
        changeHandler={(val) => setProductPrice(Number(val.target.value))}
      />
      <InputField
        type="number"
        label="Quantity"
        name="qty"
        defaultValue={data.qty}
        value={data.qty}
        changeHandler={(val) => setQty(Number(val.target.value))}
      />
      <InputField
        type="number"
        label="Total"
        name="total"
        defaultValue={data.total}
        value={data.total}
        readonly={true}
      />
      {deletable ? (
        <div className="flex flex-grow-0 align-middle items-center pt-4 w-full">
          <button
            className="bg-red-500 py-2 px-6 rounded-md hover:bg-red-700 text-white w-full"
            onClick={() => deleteRow(data.id)}
          >
            Delete
          </button>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
