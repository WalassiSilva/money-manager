// import React, { ReactNode, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { CategoriesProps } from "../../../Types";
// import { format } from "date-fns";

// import { FaCalendarAlt } from "react-icons/fa";
// import Calendar from "react-calendar";
// import { deleteTransaction, getCategories, getTransactionById } from "../../../services-api";
// import { baseUrl } from "../../../variables";

// export const TransactionForm = () => {

//   const [title, setTitle] = useState("");
//   const [value, setValue] = useState(0);
//   const [day, setDay] = useState(new Date());
//   const [category_id, setCategory_id] = useState(0);
//   const [type, setType] = useState(0);
//   const [categories, setCategories] = useState<CategoriesProps[]>([]);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const idParam = useParams();
//   const navigate = useNavigate();  
 
//   const [isLoading, setIsLoading] = useState(false);
 

//   useEffect(() => {

//     // fetchGetTransaction(Number(idParam.id));
//     fetchGetCategories();


//   }, []);
//   console.log(idParam.id);
  

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   const data = { title, value, day, category_id, type };

//   //   fetch(`${baseUrl}/${idParam.id}`, {
//   //     method: "PUT",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(data)
//   //   }).then(() => {
//   //     console.log(("Trascaction Updated"));
//   //     navigate(-1);
//   //   });
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     console.log("handle submit");
    
//     const data = { title, value, day, category_id, type };

//     setIsLoading(true);

//     fetch(`${baseUrl}/add`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     }).then(() => {
//       console.log("Transaction added");
//       setIsLoading(false);
//       navigate(-1);
//     });

//   }
//   };
//   const handleDayChange = (e) => {
//     const newDate = e.target.value;
//     console.log(e.target.value);

//     setDay(new Date(newDate));
//   };

//   const handleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };
//   const handleCalendarChange = (date: Date) => {
//     setDay(new Date(date));
//     setShowCalendar(!showCalendar);
//   };

//   // const fetchGetTransaction = async (id: number) => {
//   //   const data = await getTransactionById(Number(id));
//   //   setTitle(data.target.title);
//   //   setValue(data.target.value);
//   //   setDay(data.target.day);
//   //   setCategory_id(data.target.category_id);
//   //   setType(data.target.type);
//   // };

//   const fetchGetCategories = async () => {
//     const data = await getCategories();
//     setCategories(data);
//   };

//   const handleDelete = async (id: number) => {
//     const check = confirm("Deletar transação?");
//     if (check) {
//       await deleteTransaction(Number(id));
//       navigate(-1);
//     } else return;
//   };

//   return (

//     <form onSubmit={handleSubmit}
//       className="flex flex-col gap-3  ">
//       <div className="flex flex-col">
//         <label >Title</label>
//         <input type="text"
//           value={title} onChange={e => setTitle(e.target.value)}
//           className="bg-gray-800 rounded-md border-none outline-none pl-4" />
//       </div>

//       <div className="flex flex-col">
//         <label >Value</label>
//         <input type="number"
//           value={value}
//           onChange={(e) => {
//             setValue(Number(e.target.value));
//           }}
//           className="remove-arrow bg-gray-800 rounded-md border-none outline-none pl-4" />
//       </div>

//       <div className="flex flex-col">
//         <label>Category</label>
//         <div className="flex gap-1">
//           <select
//             value={category_id} onChange={e => setCategory_id(Number(e.target.value))}
//             className="w-full bg-gray-700 rounded-md border-none outline-none pl-4" >
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>{category.title}</option>
//             ))}
//           </select>
//           <input readOnly type="text" value={category_id}
//             className="bg-gray-800 rounded-md border-node outline-none w-8 text-center" />
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <label >
//           Day
//           <span className="text-sm text-slate-300"> dd/MM/yyyy</span>
//         </label>
//         <div className="flex gap-1">
//           <input type="text" placeholder="Date" readOnly
//             value={format(day, "dd/MM/yyyy")}
//             onChange={handleDayChange}
//             className="bg-gray-800 rounded-md border-none outline-none text-gray-400 pl-4" />

//           <div className=" relative flex justify-center items-center bg-gray-800 rounded-md border-node outline-none w-8 cursor-pointer hover:scale-110 duration-200"
//           ><FaCalendarAlt onClick={handleCalendar} /></div>

//         </div>
//         <div className="relative flex justify-center">{showCalendar === true && (
//           <Calendar calendarType="gregory"
//             className=" absolute p-0 left-0  duration-300 hover:duration-300 rounded-lg bg-gray-500 text-white "
//             onClickDay={handleCalendarChange}
//             value={day} />
//         )
//         }</div>

//       </div>

//       <div className="flex flex-col">
//         <label >Type</label>
//         <select
//           value={type}
//           onChange={e => setType(Number(e.target.value))}
//           className="bg-gray-700 rounded-md border-node outline-none pl-4">
//           <option value="0">Expense</option>
//           <option value="1">Income</option>
//         </select>
//       </div>


//       <input type="submit" value="Save"
//         className={"cursor-pointer bg-gray-800 font-bold rounded-md hover:bg-slate-300 hover:text-gray-800 duration-200 active:bg-gray-500"} />

//     </form>
//   );
// };
import React, { useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { baseUrl } from "../../../variables";
import { getCategories } from "../../../services-api";
import { Link, useNavigate, } from "react-router-dom";
import { CategoriesProps } from "../../../Types";
// import { TransactionForm } from "../TransactionForm";


export const TransactionsPost = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState<number>(0);
  const [day, setDay] = useState(new Date().toLocaleDateString("en-US"));
  const [category_id, setCagetory_id] = useState(1);
  const [type, setType] = useState(0);
  const [categories, setCategoires] = useState<CategoriesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("handle submit");
    
    const data = { title, value, day, category_id, type };

    setIsLoading(true);

    fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      console.log("Transaction added");
      setIsLoading(false);
      navigate(-1);
    });

  }

  async function fetchCategories() {
    const data = await getCategories();
    setCategoires(data);
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeValue = (e) => {
    setValue(Number(e.target.value));
  };
  const onChangeCategory = (e) => {
    console.log("change category");
    
  };

  return (
    <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className=" w-full my-2 ">
        <nav className="flex items-center justify-between">

          <div className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105 ">
            <Link to={"/"}><FaArrowLeft /></Link>
          </div>

          <p className="font-bold">Add Transaction</p>
          <button className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105">
            <BsTrash3Fill />
          </button>
        </nav>
      </header>

      {/* <TransactionForm
        onSubmit={handleSubmit}
        title={title} onChangeTitle={onChangeTitle}
        value={value} onChangeValue={onChangeValue}
        // categoryId={category_id} onChangeCategory={onChangeCategory}


      /> */}
            
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 [&>*]:px-4">

          <label >Titulo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="bg-gray-800 rounded-md border-node outline-none" />

          <label >Value</label>
          <input type="number"
            placeholder="R$ 500"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="remove-arrow bg-gray-800 rounded-md border-node outline-none" />

          <label >Category</label>
          <div className="flex px-[-1rem] w-full">

            <select
              value={category_id}
              onChange={(e) => setCagetory_id(Number(e.target.value))}
              className="w-20 pl-4 bg-gray-700 rounded-md border-node outline-none flex-1 p-0 ml-[-16px] " >
              {
                categories.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))
              }
            </select>
            <input type="number" readOnly
              placeholder="Category"
              value={category_id}
              onChange={(e) => setCagetory_id(Number(e.target.value))}
              className=" remove-arrow bg-gray-800 rounded-md border-node outline-none w-8 text-center ml-4 mr-[-16px]" />
          </div>


          <label >Type</label>
          <select
            value={type}
            onChange={(e) => setType(Number(e.target.value))}
            className="bg-gray-700 rounded-md border-node outline-none"  >
            <option value="0">Expense</option>
            <option value="1">Income</option>
          </select>

          <label >Date  <span className="text-slate-300 text-sm">MM/dd/YYYY</span></label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Date"
            className="bg-gray-800 rounded-md border-node outline-none" />

          {!isLoading ? (
            <input
              type="submit"
              value="Save"
              className={"cursor-pointer bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"} />
          ) : (
            <input disabled
              type="submit"
              value="Saving..."
              className={"cursor-wait opacity-50 bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"} />
          )}


        </div>
      </form> 

    </main>
  );
};
