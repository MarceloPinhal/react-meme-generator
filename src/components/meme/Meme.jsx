import React from "react";
import "./Meme.css"



const Meme = () => {

const [meme,setMeme] = React.useState({
  topText:"",
  bottomText:"",
  randomImg:"http://i.imgflip.com/1bij.jpg"
})

const [allMemes, setAllMemes] = React.useState([])

React.useEffect(()=> {
  console.log("Effect ran")
  fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
}, [])

console.log(allMemes)

const getRandomImg = ()=>{
  
  const randomIndex = Math.floor(Math.random() * allMemes.length)
  const {url} = allMemes[randomIndex]
  setMeme(prevState=>{
    return {
      ...prevState,
      randomImg: url
    }
  })
}

const handleFormInputs = (event) =>{
  const {name, value} = event.target
  setMeme((prevMeme)=>{
    return {
      ...prevMeme,
        [name]:value
    }
  })
}

  return (
    <main>
    <div className="form-container">
        <input 
        className="form-input" 
        type="text" 
        placeholder="top text"
        onChange={handleFormInputs} 
        // name has to be the exact value/string of the state object property we want to target
        name="topText"
        // controlled input. This should be done to not overlapse with the values from the HTML input. This allows React to take control of the input
        value = {meme.topText}
        />
        <input 
        className="form-input" 
        type="text" 
        placeholder="bottom text"
        onChange={handleFormInputs} 
        name="bottomText"
        value = {meme.bottomText}
        />
        <button className="form-button" onClick={getRandomImg}>Get new meme template💥</button>

    </div>
    <div className="meme">
    <div className="meme-image__container">
    <img src={meme.randomImg} className="meme-image" alt="random-meme"/>
    </div>
    <h2 className="meme-text top" >{meme.topText}</h2>
    <h2 className="meme-text bottom">{meme.bottomText}</h2>
  </div>
    </main>
   
  );
};

export default Meme;
