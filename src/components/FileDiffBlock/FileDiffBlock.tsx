import React from "react";
import { DifferencesData } from "../../interfaces/interfaces";

const FileDiffBlock: React.FC<DifferencesData> = ({differences, different}) => {

    if (!differences || !different) {
    return null; 
    }
    return (
        <div>
          {/* {different ? 'Files are different' : 'Files are identical'} */}
          <ul className="list-group">
            {differences.map((diff, index) => (
              <li className="list-group-item" key={index}>
                <span>{`File ${diff.file} - Line ${diff.line}: `}</span>
                <span style={diff.status === 'Added' ? { color: 'green' } : { color: 'red' }}>
                  {`${diff.status}: ${diff.value}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default FileDiffBlock