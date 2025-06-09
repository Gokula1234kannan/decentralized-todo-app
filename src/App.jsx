import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./utils/Contract";
import TaskItem from "./components/TaskItem";
import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
  };

  const loadTasks = async () => {
    const contract = await getContract();
    const data = await contract.getTasks();
    setTasks(data);
  };

  const addTask = async () => {
    if (!taskInput) return;
    const contract = await getContract();
    const tx = await contract.addTask(taskInput);
    await tx.wait();
    setTaskInput("");
    loadTasks();
  };

  const toggleTask = async (index) => {
    const contract = await getContract();
    const tx = await contract.toggleTask(index);
    await tx.wait();
    loadTasks();
  };

  const deleteTask = async (index) => {
    const contract = await getContract();
    const tx = await contract.deleteTask(index);
    await tx.wait();
    loadTasks();
  };

  useEffect(() => {
    if (walletAddress) loadTasks();
  }, [walletAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-black drop-shadow-lg animate-fade-in-down">
          Decentralized To-Do List
        </h1>

        {walletAddress ? (
          <>
            <p className="text-center mb-4 text-sm sm:text-base text-black/80 ">
              Connected Wallet:
              <span className="font-mono p-1">{walletAddress}</span>
            </p>

            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task..."
                className="flex-grow px-4 py-2 rounded-lg bg-white/20 text-black placeholder-black/60 outline focus:ring-2 focus:ring-purple-300 transition-all duration-300"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-white font-semibold text-lg flex items-center justify-center"
              >
                Add Task
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto custom-scroll">
              {tasks.map((task, index) => (
                <div key={index} className="animate-slide-in-up">
                  <TaskItem
                    index={index}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 animate-bounce mt-5 hover:shadow-xl active:scale-95 hover:cursor-pointer "
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
