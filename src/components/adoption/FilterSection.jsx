import './filtersection.css'
import NoResoultModal from './NoResoultModal'


const FilterSection = ({setSearchGender, setSearchAge, setSearchSize}) => {
    return(
        <div className='filter-section-container container'>
            <div className="row">
                <div className="col">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle filterbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        מין
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={() => {setSearchGender("זכר")}}><a className="dropdown-item" href="#">זכר</a></li>
                        <li onClick={() => {setSearchGender("נקבה")}}><a className="dropdown-item" href="#">נקבה</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li onClick={() => {setSearchGender("")}}><a className="dropdown-item" href="#">הכל</a></li>
                    </ul>
                </div>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle filterbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            גיל 
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() => {setSearchAge("עד שנה")}}><a className="dropdown-item" href="#">עד שנה</a></li>
                            <li onClick={() => {setSearchAge("מעל שנה")}}><a className="dropdown-item" href="#">מעל שנה</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li onClick={() => {setSearchAge("")}}><a className="dropdown-item" href="#">הכל</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle filterbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            גודל
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() => {setSearchSize("גדול/ה")}}><a className="dropdown-item" href="#">גדול/ה</a></li>
                            <li onClick={() => {setSearchSize("בינוני/ת")}}><a className="dropdown-item" href="#">בינוני/ת</a></li>
                            <li onClick={() => {setSearchSize("קטן/ה")}}><a className="dropdown-item" href="#">קטן/ה</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li onClick={() => {setSearchSize("")}}><a className="dropdown-item" href="#">הכל</a></li>
                        </ul>
                    </div>
                </div>
                    <p> </p>
            </div>
        </div>
    )
}

export default FilterSection