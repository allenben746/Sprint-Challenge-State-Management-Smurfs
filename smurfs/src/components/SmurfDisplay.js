import React, { useContext } from "react";
import { SmurfContext } from "../contexts/SmurfContexts";
import axios from "axios";

function SmurfDisplay(props) {

  console.log(props.smurfs)
  const { smurfList } = useContext(SmurfContext);
  const removeSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)

      .then(res => console.log("Removed:", res))

      .catch(function(error) {
        console.log(error);
      });
  };
  // console.log("Smurf List ->", smurfList)
  return (
    <div>
      <h1>Smurfs</h1>
      {props.smurfs && props.smurfs.map(smurf =>
      
              <>
                <div>{smurf.name}</div>
                <button onClick={() => removeSmurf(smurf.id)}>Remove Smurf</button>
              </>
            
          )
        }
    </div>
  );
}

export default SmurfDisplay;