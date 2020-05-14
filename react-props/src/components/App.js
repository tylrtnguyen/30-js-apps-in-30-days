import React from 'react'
import Card from './Card'

const beyonce = {
    name: "Beyonce",
    img_src: "https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg",
    number: "+123 456 789",
    email: "b@beyonce.com"
  }
  
  const jackBauer = {
    name: "Jack Bauer",
    img_src: "https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg",
    number: "+987 654 321",
    email: "jack@nowhere.com"
  }
  
  const chuckNorris = {
    name: "Chuck Norris",
    img_src: "https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png",
    number: "+918 372 574",
    email: "gmail@chucknorris.com"
  }
  

const App = () => {
    return (
        <div>
            <Card person={beyonce}/>
            <Card person={jackBauer}/>
            <Card person={chuckNorris}/>
        </div>
    )
}

export default App