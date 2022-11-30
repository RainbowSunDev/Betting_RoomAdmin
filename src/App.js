import './App.css';
import Navbar from './components/layouts/navbar';
import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client'
const SOCKET_CHAT_JOIN_ROOM = "c/1";
const SOCKET_CHAT_SEND_MESSAGE = "c/2";
const SOCKET_CHAT_USERS_LIST = "c/5"
const SOCKET_CHAT_SENT = "c/4";

const SOCKET_BET_JOIN_ROOM = "b/2"
const SOCKET_BET_BET = "b/1"
const USER_SEND_MSG = 1 // user send the message
const ADMIN_SEND_MSG = 2 // admin send the message

const RES_STATUS_ERROR = 0; // other errors
const RES_STATUS_SUCCESS = 1; // 200
const SOCKET_BET_TABLE_EVENT = "b/14";

const SOCKET_JOIN_ROOM = "join_room"
const roomID = "638026daa55a568ba804ce85"
const server = "http://192.168.125.102:4000"
const imageURL = "http://192.168.125.102:4000/images/"
const adminID = "6380089327d9ee4ed4261bea"
const socket =  socketIO.connect(server, {
  cors: {
    origin: "*",
  }
},);
function App() {
  // Similar to componentDidMount and componentDidUpdate:
  const [chattingList, setchattingList] = useState([]);
  const [allowedUserList, setAllowedUserList] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lotteryList, setLotteryList] = useState([
    {
      id: "638118ab5d3f0000840071e2",
      name: "幸运飞艇",
      image: "gameSymbolBg1.png"
    },
    {
      id: "63811b0e5d3f0000840071e3",
      name: "极速赛车",
      image: "gameSymbolBg2.png"
    },
    {
      id: "63811b385d3f0000840071e4",
      name: "极速时时彩",
      image: "gameSymbolBg3.png"
    },
    {
      id: "63811b5b5d3f0000840071e5",
      name: "幸运飞艇",
      image: "gameSymbolBg4.png"
    },
    {
      id: "63811b645d3f0000840071e6",
      name: "极速飞艇",
      image: "gameSymbolBg5.png"
    }
  ]);
  const getUserMessage = (event, user_id) => {
    event.preventDefault();
    if(selectedTab == 0)
    {
      setSelectedItem({
        avatar: 'avatar/' + user_id.avatar,
        name: user_id.userId
      })
      socket.emit(SOCKET_CHAT_JOIN_ROOM, {
        userID: user_id._id,
        roomID,
      })
    }
    if(selectedTab == 1)
    {
      setSelectedItem({
        avatar: 'room/' + user_id.image,
        name: user_id.name
      })
      socket.emit(SOCKET_BET_JOIN_ROOM, {
        userID: adminID,
        roomID,
        lotteryType: user_id.id
      })
    }
  }
  const sendMessage = (e) => {
    e.preventDefault();
    if(message != "")
    {
      if(selectedTab == 0)
      {
        socket.emit(SOCKET_CHAT_SEND_MESSAGE, {
          userID: selectedItem._id,
          roomID,
          sendTo: ADMIN_SEND_MSG,
          msg: message
        })
      }
      if(selectedTab == 1)
      {
        socket.emit(SOCKET_BET_BET, {
          userInfo: {
            _id: adminID
          },
          roomID,
          lotteryType: selectedItem.id,
          msg: message
        })
      }
    }
  }
  socket.on(SOCKET_BET_BET, (data, status) => {
    
    if(status == RES_STATUS_SUCCESS)
    {
      // console.log(data, status)
    //   if(sendTo == ADMIN_SEND_MSG)
    //   {
    //     let temp = [...msgList]
    //     temp.push({
    //       msg: content,
    //       sender_type: "admin",
    //     })
    //     setMsgList(temp)
    //   }
    //   if(sendTo == USER_SEND_MSG)
    //   {
    //     let temp = [...msgList]
    //     temp.push({
    //       msg: content,
    //       sender_type: "user",
    //     })
    //     setMsgList(temp)
    //   }
    //   setMessage("")
    // }
    // else{
    //   alert("Sorry try again.")
    }
  })
  
  const getBettingRoomList = (e) => {
    e.preventDefault()
    setchattingList(lotteryList);
    setSelectedItem({
      name: lotteryList[0].name,
      avatar: 'room/' + lotteryList[0].image,
    })
    socket.emit(SOCKET_BET_JOIN_ROOM, {
      userID: adminID,
      roomID,
      lotteryType: lotteryList[0].id
    })
  }
  
  socket.on(SOCKET_CHAT_SENT, ({status, sendTo, content, date}) => {
    if(status == RES_STATUS_SUCCESS)
    {
      if(sendTo == ADMIN_SEND_MSG)
      {
        let temp = [...msgList]
        temp.push({
          msg: content,
          sender_type: "admin",
        })
        setMsgList(temp)
      }
      if(sendTo == USER_SEND_MSG)
      {
        let temp = [...msgList]
        temp.push({
          msg: content,
          sender_type: "user",
        })
        setMsgList(temp)
      }
      setMessage("")
    }
    else{
      alert("Sorry try again.")
    }
  })
  useEffect(() => {
    // Update the document title using the browser API
    socket.on('connect', () => {
      alert("connect successful!!!")
      // socket.join(SOCKET_JOIN_ROOM, {roomID})
      socket.emit(SOCKET_JOIN_ROOM, {roomID})
      socket.emit(SOCKET_CHAT_USERS_LIST, {roomID})
    });
    
    socket.on('disconnect', () => {
      socket =  socketIO.connect(server);
      setIsConnected(false);
    });
    socket.on(SOCKET_CHAT_JOIN_ROOM, (res) => {
      if(res && res.data.msg)
        setMsgList(res.data.msg)
    })
    socket.on(SOCKET_BET_JOIN_ROOM, ({data, status, date}) => {
      if(status == RES_STATUS_SUCCESS)
       {
         console.log(data, status, date)
        //  if(data.betlogs != null || data.betlogs.length != 0)
        //   {
        //     let temp = []
        //   data.betlogs.map((item, index) => {
        //   if(item != null)
        //     temp.push(item)
        // })
        //     setMsgList(temp)
        //   }
        // else
        //   setMsgList([])
       }
     })
     socket.on(SOCKET_BET_TABLE_EVENT, ({data, status, date}) => {
      // debugger
      
      if(data.betlogs != null || data.betlogs.length != 0)
        {
          let temp = []
        data.betlogs.map((item, index) => {
        if(item != null)
          temp.push(item)
      })
          setMsgList(temp)
        }
      else
        setMsgList([])
     })
    socket.on(SOCKET_CHAT_USERS_LIST, ({data}) => {
      if(data)
      {
        setchattingList(data.allowedUsers)
        setAllowedUserList(data.allowedUsers)
        setSelectedItem({
          avatar: 'avatar/' + data.allowedUsers[0].avatar,
          name:  data.allowedUsers[0].userId
        })
        // setSelectedItem(data.allowedUsers[0])
        if(data.allowedUsers[0])
        socket.emit(SOCKET_CHAT_JOIN_ROOM, {
          userID: data.allowedUsers[0]._id,
          roomID,
        })
      }
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off(SOCKET_CHAT_SENT);
      socket.off(SOCKET_CHAT_USERS_LIST);
      socket.off(SOCKET_CHAT_JOIN_ROOM);
      socket.off(SOCKET_BET_JOIN_ROOM);
      socket.off(SOCKET_BET_TABLE_EVENT);
      // socket.removeAllListeners();
      // socket.close();
    };
  }, []);
  
  const sendPing = () => {
    socket.emit('ping');
  }

  return (
    <div className="">
      <header className="">
        <Navbar/>
      </header>
      <div>
      <div className="container mx-auto pt-12">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li className="mr-2" role="presentation">
            <button className="inline-block p-4 rounded-t-lg border-b-2" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={(e) => {setchattingList(allowedUserList);setSelectedTab(0)}}>Private Chat</button>
        </li>
        <li className="mr-2" role="presentation">
            <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false" onClick={(e) => {setSelectedTab(1);getBettingRoomList(e);}}>Betting Rooms</button>
        </li>
    </ul>
</div>

<div className="min-w-full border rounded lg:grid lg:grid-cols-4 flex lg:flex-row flex-col justify-between items-start px-3">
        <div className="border-r border-gray-300 lg:col-span-1 w-full">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>
          
          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Admin Chats</h2>
              {
                chattingList &&
                (
                  chattingList.map((item, index) => {
                    return (
                      <li onClick = {(e) => {getUserMessage(e, item)}} className="user_list_item active" key={index}>
                        <div className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                          <img className="object-cover w-10 h-10 rounded-full" src={imageURL + (selectedTab == 0 ? ('avatar/' + item.avatar) : ('room/' + item.image))} alt="username" />
                          <div className="w-full pb-2">
                            <div className="flex justify-between">
                              <span className="block ml-2 font-semibold text-gray-600">{selectedTab == 0 ? item.userId : item.name}</span>
                            </div>
                          </div>
                        </div>
                    </li>)
                  })
                )
              }
          </ul>
        </div>
        {
          selectedTab == 0 ? 
          <div className='lg:col-span-3 lg:block w-full'>
            <div>
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img className="object-cover w-10 h-10 rounded-full"
                src={selectedItem ? imageURL + selectedItem.avatar : "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"} alt="username" />
              <span className="block ml-2 font-bold text-gray-600">{selectedItem && selectedItem.name}</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem] flex flex-col-reverse">
              <ul className="space-y-2">
                {
                  msgList && msgList.map((item, index) => {
                    if(item.sender_type == "user" || item.sender_type == "super_admin")
                      return (
                        <div className='flex flex-col' key={index}>
                          <div className='text-[13px] text-[#919090] flex justify-start'>{item.date}</div>
                          <li className="flex justify-start" key={index}>
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                              {item.msg}
                            </div>
                          </li>
                        </div>
                      )
                    else
                    return (
                      <div className='flex flex-col' key={index}>
                        <div className='text-[13px] text-[#919090] flex justify-end'>{item.date}</div>
                        <li className="flex justify-end" key={index}>
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                          <span className="block">{item.msg}</span>
                        </div>
                        </li>
                      </div>
                    )
                  })
                }
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input type="text" placeholder="Message" onKeyUp = {(e) => {if(e.key === 'Enter') sendMessage(e) }}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" value={message} onChange={(e) => {setMessage(e.target.value)}} required />
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button type="submit" onClick={(e) => {sendMessage(e)}}>
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
          </div> : 
          <div className='lg:col-span-3 lg:block w-full'>
            <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              No
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              DateTime
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              UserId
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              Content
              </th>
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              LotteryResult
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
              Profit
              </th>
            </tr>
            </thead>
            <tbody>
                {
                  msgList && msgList.map((item, index) => {
                    return (
                      <tr className="border-b">
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {item.DateTime}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {item.UserId}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {item.Content}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {item.lotteryResult}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {item.Profit}
                      </td>
                    </tr>
                    )
                  })
                }
                {/* <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  No
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  DateTime
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  UserId
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Content
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  LotteryResult
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Profit
                </td> */}
              {

              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
          </div>
        }
      </div>
    </div>
      </div>
    </div>
  );
}

export default App;
