import './adoption.css'
import { useEffect, useState } from "react"
import DogCard from "../../components/adoption/DogCard"
import FilterSection from "../../components/adoption/FilterSection"
import axios from 'axios'
import dog from '../../components/home-sections/about/doglogo.png'
import NoResoultModal from '../../components/adoption/NoResoultModal'



const Adoption = () => {
    const [searchGender, setSearchGender] = useState("");
    const [searchAge, setSearchAge] = useState("");
    const [searchSize, setSearchSize] = useState("");

    const getDogs = () => {
        axios.get('/api/dogs')
            .then((res) => {
                res.data && setDogs(res.data)
            })
            .catch((err) => console.log(err));
    }

    const [dogs, setDogs] = useState([])

    const filtered = () => {
        return(
            dogs.filter((val) => {
                if(searchGender == ""){
                    return val;
                }else if(val.gender.includes(searchGender)){
                    return val;
                }
            }).filter((val) => {
                if(searchAge == ""){
                    return val;
                }else if(val.age.includes(searchAge)){
                    return val;
                }
            }).filter((val) => {
                if(searchSize == ""){
                    return val;
                }else if(val.size.includes(searchSize)){
                    return val;
                }
            })
        )
    }
    
    useEffect(()=>{
        getDogs()
    },[])

    return(
      
        <div className="adoption-container container">
            <div className='save-your-spot-btn'>
                <NoResoultModal name="מיצאו את הכלב עבורכם"/>  
            </div>
             <div className='adoptedtop'> <img className='doghand' src={dog} />
                <h1 className='adoptiontitle'>אמצו כלב עוד היום</h1>
              </div>

            <FilterSection 
                setSearchGender={setSearchGender} 
                setSearchAge={setSearchAge}
                setSearchSize={setSearchSize}
            />
            <div className="cards-container">
                {filtered().length === 0 ? 
                    (<div>
                        <p>לא מוצא/ת את הכלב שאת/ה מחפש/ת?</p>
                        <NoResoultModal name="לחצ/י כאן" size={searchSize} age={searchAge} gender={searchGender} />
                    </div>) : filtered().map(dog => <DogCard dog={dog}/>)}
            </div>
        </div>
    )
}

export default Adoption