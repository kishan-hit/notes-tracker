import React from 'react';
import Delete from '../assets/icons/Delete';

const Message = (props) => {
    function handleDelete() {
        let retString;
        if (props.setMessageList) {
            retString = localStorage.getItem("messages");
        }
        else {
            retString = localStorage.getItem("bookmarks");

        }
        let array = JSON.parse(retString);

        array = array.filter((ele) => {
            return ele !== props.message;
        })

        let string = JSON.stringify([...array]);

        if (props.setMessageList) {
            localStorage.setItem("messages", string);
            props.setMessageList(array);
        }
        else {
            localStorage.setItem("bookmarks", string);
            props.setBookmarkList(array);
        }
    }
    return (
        <div className='w-full h-fit p-2 bg-gray-700 rounded-lg flex justify-between'>
            <div className='w-[95%]'>
                {props.message}
            </div>
            <div className='cursor-pointer flex items-center justify-center' onClick={handleDelete}>
                <Delete height="20px" fill="red" />
            </div>
        </div>

    )
}

export default Message