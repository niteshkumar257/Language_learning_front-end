import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import { base_url } from '../../../utils/apiroute';
import toast from "react-hot-toast";
import Loader from '../../../component/Loader/Loader';
import "./AddLang.css";
import QuizIcon from '@mui/icons-material/Quiz';
import Navbar from '../../../component/Navbar/Navbar';

const AddLang = () => {
    const [langList,setLangList]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const [lang,setLang]=useState("");
    const [isadding,setIsAdding]=useState(false);
    const getLanguages=()=>{
        axios.get(`${base_url}/lang/getAllLang`)
        .then((res)=>
        {
          
            setLangList(res.data);
            setIsLoading(false);
            
        }).catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }
    useEffect(()=>{
       getLanguages();
    },[])
    const addLang=()=>
    {
        setIsAdding(true);
        console.log(lang);
        axios.post(`${base_url}/lang/createLang`,{name:lang}).then((res)=>
        {
            console.log(res);
            toast.success("Language Added succesfully");
            getLanguages();
            setIsAdding(false);
            setLang("");
        }).catch((err)=>
        {
            console.log(err);
            setIsAdding(false);
            toast.error("Something went wrong");
            setLang("");
        })
    }

    const handleClick=(id)=>{
 
         c
        
        navigate(`/addquestions`);

  }

  return (
   
    <div className='layout-container'>
    <div className="top-container">
       <Navbar />
    </div>
    <div className="bottom-container">
    <div className="lang-card-container">
       <div className="add-container">
        <input  placeholder='Enter Lanuage name' type='text' name='lang' value={lang} onChange={(e)=>setLang(e.target.value)}/>
        <button  onClick={addLang}>{isadding ? <Loader visible={isadding}/>:"Add"}</button>
       </div>
       <div className="list-container">
            {
                isLoading ? <span>Loading ..</span> :langList?.map((lang)=>(
                    <div onClick={()=>handleClick(lang._id)}  className='lang-container'>
                        <span>{lang.name}</span>
                        <QuizIcon/>
                    </div>
                ))
            }
       </div>
   </div>
    </div>
  </div>
   
  
   
  )
}

export default AddLang