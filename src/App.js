import React, {useEffect, useState} from 'react';
import ImageCard from "./components/ImageCard";
import SearchImage from "./components/SearchImage";

const App = () => {
    const [images,setImages]=useState([])
    const [loading,setLoading]=useState(true)
    const [term,setTerm]=useState('')
    useEffect(()=>{
       fetchImages()
    },[])
    const onSubmit = (e) => {
      e.preventDefault()
        fetchImages()
    }
    const fetchImages = () => {
        fetch(`https://cors-anywhere.herokuapp.com/https://pixabay.com/api?key=${process.env.REACT_APP_API_KEY}&q=${term}`)
            .then(res=>{
                return res.json()
            }).then(data=>{
            console.log(data.hits)
            setImages(data.hits)
            setLoading(false)
        }).catch(err=>console.log(err))
    }
    if(loading) return 'Loading ...'
    return (
        <div className={'container mx-auto'}>
            <SearchImage onSubmit={onSubmit} setTerm={setTerm}/>
            <div className={'grid grid-cols-3 gap-4'}>
                {images?.map((item,i)=>{
                   return <ImageCard key={i} image={item}/>
                })}
            </div>
        </div>
    );
};

export default App;