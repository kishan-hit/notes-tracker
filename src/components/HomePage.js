import React, { useEffect, useState } from 'react';
import Note from '../assets/icons/Note';
import Copy from '../assets/icons/Copy';
import Bookmark from '../assets/icons/Bookmark';
import Send from '../assets/icons/Send';
import Message from './Message';
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {
    const [input, setInput] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
    const navigate = useNavigate();

    const { param } = useParams();

    function handleSubmit() {
        if (input) {
            if (!param) {
                setMessageList([...messageList, input]);
                let string = JSON.stringify([...messageList, input]);
                localStorage.setItem("messages", string);
            }
            else {
                setBookmarkList([...bookmarkList, input]);
                let string = JSON.stringify([...bookmarkList, input]);
                localStorage.setItem("bookmarks", string);
            }
            setInput("");
        }
    }

    function enteredKey(e) {
        if (e.key === 'Enter')
            handleSubmit();
    }

    useEffect(() => {
        if (!param) {
            let retString = localStorage.getItem("messages");
            let retArray = JSON.parse(retString);
            retArray && setMessageList(retArray);
        }
        // eslint-disable-next-line
        else {
            let retString = localStorage.getItem("bookmarks");
            let retArray = JSON.parse(retString);
            retArray && setBookmarkList(retArray);
        }
        // eslint-disable-next-line
    }, [param])


    return (
        <div className="h-screen w-screen bg-ocean bg-cover flex justify-center items-center">
            <div className='h-[80%] w-[80%] flex'>
                <div className='h-[100%] w-[25%] bg-white'>
                    <div className='bg-green-800 text-white h-14 flex items-center justify-center text-lg space-x-2'><Note height="30px" fill="orange" /><div>DAILY NOTE TRACKER</div></div>
                    <div className={`text-blue-600 h-12 flex items-center ${!param ? 'bg-gray-200' : ''} cursor-pointer space-x-2 px-4`} onClick={() => navigate('/')}><div className='bg-blue-700 p-1 rounded-2xl'><Copy height="20px" fill="white" /></div><div>Daily Notes</div></div>
                    <div className={`text-red-600 h-12 flex items-center ${param ? 'bg-gray-200' : ''} space-x-2 px-4 cursor-pointer`} onClick={() => navigate('/bookmarks')}><div className='bg-red-600 p-1 rounded-2xl'><Bookmark height="20px" fill="white" /></div><div>Bookmarks</div></div>
                </div>
                <div className='w-[75%] relative'>
                    <div className='h-[90%] w-full bg-gray-500 px-4 py-2 opacity-60 space-y-2 overflow-y-scroll scrollbar-hide'>
                        {!param ? messageList.map((msg, index) => {
                            return <Message key={index} message={msg} setMessageList={setMessageList} />
                        }) : bookmarkList.map((bookmark, index) => {
                            return <Message key={index} message={bookmark} setBookmarkList={setBookmarkList} />
                        })
                        }
                    </div>
                    <div className='w-full h-[10%] bg-white flex items-center justify-between px-4'>
                        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a daily note' className='w-[95%] px-2 rounded-sm bg-gray-300' onKeyPress={enteredKey} />
                        <div className='flex items-center justify-center w-fit h-full'>
                            <div className='bg-green-700 p-1 rounded-2xl cursor-pointer' onClick={handleSubmit}>
                                <Send height="20px" fill="white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage