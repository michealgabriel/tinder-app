
// react imports
import React, { useEffect, useRef, useState } from 'react';
import ReactTinderCard from 'react-tinder-card';

//custom imports
import './TinderCards.css'

function TinderCards() {
    
    const shouldFetchPeople = useRef(true);
    const [isFetchingPeople, setisFetchingPeople] = useState(false);

    // Declare state variables for components/view datas
    const [people, setPeople] = useState([]);

    const fetchData = () => {
        if(shouldFetchPeople.current){
            shouldFetchPeople.current = false; // Needed this because React strict mode mounts components twice on init lifecycle

            setisFetchingPeople(true); // Notify state of json fetching status

            fetch('people.json', {    // Called from public directory
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(myJson => {
                // console.log(myJson);

                setPeople(myJson.people);
                setisFetchingPeople(false);
            }); 
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const swiped = (direction, nameToDelete) => {
        console.log('removing '+nameToDelete);
        // setLastDirection(direction);
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen');
    }

    return (
        <div className='tinderCards'>
            <div className='tinderCards_cardContainer'>

                {
                    isFetchingPeople ? <span>Fetching data....</span>
                    :
                    people.map((eachPerson) => (
                        <ReactTinderCard className='swipe' 
                        key={eachPerson.name} 
                        preventSwipe={['up', 'down']} 
                        onSwipe={(dir) => swiped(dir, eachPerson.name)} 
                        onCardLeftScreen={() => outOfFrame(eachPerson.name)}
                        >

                        <div style={{backgroundImage: `url("${eachPerson.url}")` }} className='card'>
                            <h3>{eachPerson.name}</h3>
                        </div>

                        </ReactTinderCard>
                    ))
                }
            </div>
        </div>
    )
}

export default TinderCards