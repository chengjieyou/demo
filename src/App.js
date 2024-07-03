import React from 'react';
import { useState,useEffect } from 'react';
import './index.css'

const App = () => {
    const [data,setData] = useState([]);
    const [idx,setIdx] = useState(0);
    const getData=()=>{
        return fetch('https://v1.jinrishici.com/all.json').then(res=>res.json())
    }

    useEffect(()=>{
        getData()
        .then(res=>{
            data.push(res)
            setData([...data])
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    console.log('data',data);
    const toLeft=()=>{
        if(idx==0){
            getData()
            .then(res=>{
                data.unshift(res)
                setData([...data])
            })
            .catch(err=>{ 
                console.log(err)
            })
        }else{
            const index=idx-1
            setIdx(index)
        }
        
    }

    const toRight=()=>{
        if(idx===data.length-1){
            getData()
            .then(res=>{
                data.push(res)
                setData([...data])
                const index=idx+1
                setIdx(index)
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            const index=idx+1
            setIdx(index)
        }
    }

    return (
        <div className='app'>
            <div className='content'>
                <div className='main'>{data[idx].content}</div>
                <div className='btn1' onClick={toLeft}>&lt;</div>
                <div className='btn2' onClick={toRight}>&gt;</div>
            </div>
            <div className='footer'>{data[idx].author}</div>
        </div>
    );
}

export default App;
