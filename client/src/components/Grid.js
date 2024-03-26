import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Grid = ({ data }) => {
    // pref[i] stores selection of ith card
    // pref[i] will either be a number = preference, or 'abs' or 'rej' or null
    const baseUrl = "https://script.google.com/macros/s/AKfycbyvPJyaxOkx6-zKRpLlOfx3Eq4iOL5A7TR9Nyke8kvMuB2S35y_J0ugMqxaMf6wLb9mpg/exec"
    const {user} = useContext(UserContext)
    const [pref, setPref] = useState(new Array(data.length).fill(null));
    const [isAbs, setIsAbs] = useState(false);
    const [isRej, setIsRej] = useState(false);
    const [final, setFinal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate()
    
    let voteString = ""
    const pollString = "SLCS"
    let finalString = ""
    // available preferences
    const [availablePref, setAvailablePref] = useState(new Array(data.length).fill(true));

    useEffect(() => {
        setFinal(f => {
            if(isRej) return 'rej';
            else if(isAbs) return 'abs';
            else return pref.filter(p => typeof p === 'number').map(p => p + 1).join('');
        })
    }, [pref, isAbs, isRej, data]);

    useEffect(() => {
        setAvailablePref(av => {
            if(isAbs || isRej) return new Array(data.length).fill(false);
            av = new Array(data.length).fill(true);
            for(let i = 0; i < data.length; i++) {
                av[pref[i]] = false;
            }
            return av;
        })
    }, [data, pref, isAbs, isRej]);

    const updateIthPref = (index, selection) => {
        setPref(pref => {
            pref = [...pref];
            pref[index] = selection;
            return pref;
        });
    }

    const setAbsHelper = () => {
        let value = !isAbs;
        if(value) {
            setPref(new Array(data.length).fill(null));
            setIsRej(false);
        }
        setIsAbs(value);
    }

    const setRejHelper = () => {
        let value = !isRej
        if(value) {
            setPref(new Array(data.length).fill(null));
            setIsAbs(false);
        }
        setIsRej(value);
    }
    const result = (pref,isAbs, isRej)=>{
        
        if(!pref.includes(null)){
            const arr = pref.map((d)=>d+1)
            voteString = arr.join("")
            return pollString+voteString
        }
        voteString = isAbs? "ABS": "REJ"
        return (pollString+voteString)
    } 
    const handleSubmit = async(e)=>{
        if(isAbs || isRej || !pref.includes(null)){ 
            finalString = result(pref,isAbs,isRej)         
                        
            // console.log(pref, isAbs, isRej)
            try{
            const response = await sendVote()
            console.log(response)
            if(response.success)
            {console.log("successs")
            nav('/voted')}            
        }catch(error){
            
            console.log(error)
        }
    }
        else  alert("Either allot preferences to all candidates or choose ABSTAIN or REJECT!")
    }   
    const sendVote=async()=>{
        try{    
            setIsLoading(true);
            console.log(finalString)      
            const send =  await axios.post('http://localhost:3001/add-vote', {finalString})
            const res = await send.data
            console.log("vote sent to contract",res)
            return{success:true}
        }catch(e){
            console.log(e)
            alert("Error submitting vote!")
            return{success:false, error: e}
        }finally{
            setIsLoading(false)
            
        }
    }

    return (
        <div>
            <div className="mt-40 grid grid-cols-1 gap-20 px-40 pb-20 ">
                <div className='flex gap-32 h-12 item-center justify-center mb-12'>
                    <button 
                        className={'w-72 h-20 text-white text-2xl bg-blue-500 rounded-md ring-black transition-all duration-200 hover:brightness-100 ' + (isAbs ? 'brightness-100 ring-4' : 'brightness-50 ring-0')}
                        onClick={setAbsHelper}
                    >
                        Abstain
                    </button>
                    <button 
                        className={'w-72 h-20  bg-rose-600 text-2xl text-white rounded-md ring-black transition-all duration-200 hover:brightness-100 ' + (isRej ? 'brightness-100 ring-4' : 'brightness-50 ring-0')}
                        onClick={setRejHelper}
                    >
                        Reject
                    </button>
                </div>
                {data.map((item, index) => (
                    <Card
                        key={item.id}
                        cardData={item}
                        availablePref={availablePref}
                        selectedPreference={pref[index]}
                        updatePref={(selection) => updateIthPref(index, selection)}
                    />
                ))}
            </div>
            <div className='flex justify-center pb-20'>
                    <button 
                        className={'w-72 h-20 text-white text-2xl bg-blue-500 rounded-md ring-black transition-all duration-200 hover:brightness-100 '}
                        onClick={handleSubmit}
                    >{isLoading ? 'Loading...' : 'Submit'}
                     
                    </button>
            </div>
        </div>
    );
};

export default Grid;