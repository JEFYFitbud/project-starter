import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../services/auth';
import '../../css/ForumStarterTable.css';

//here I want the thread to be clickable to the Post it is connected to
//{ id, category, threadTitle, createdAt, updatedAt, authorId }
function ForumThreadRow({threads}) {

    const submit = (e, id) => { //calls endpoint and sends in state
        e.preventDefault();
    
        fetch("/api/forum/"+id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json;'
            },
          })
          .then(res => res.json())
          .catch(err => {
            console.log( err );
          }) 
          alert(`Deleting ${id}`);
      }

    return (
        <div>
            {threads.map((t) =>
            <tr >
                <td className="thread-starter-table td">
                    <text className="thread-starter-title">
                        Category: {t.props.category}
                        <Link to="/thread">
                            <b> {t.props.threadTitle}</b>          
                        </Link>
                        <div>
                            {
                            auth.currentUser.id === t.props.authorId
                            ? 
                                <button className="delete-button btn my-10 font-weight-bold"
                                    type="submit" 
                                    onClick={(e) => submit(e, t.props.id)}
                                > 
                                        Delete Thread 
                                </button>
                            : 
                                null
                            }        
                        </div>
                    </text>
                    <p className="thread-starter-info">
                        by <text className="starter-user">
                            {t.props.authorId}
                            </text>
                        , {t.props.createdAt}
                    </p>
                </td>
            </tr>
            )}
        </div>
    )
}

export default ForumThreadRow;