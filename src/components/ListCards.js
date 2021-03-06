import React, { Component } from 'react'

export default class ListCards extends Component {
    
    render() {
        const {_id, name, time, deleteCard} = this.props
        

        const changeToString = (time) => {
           const hours = time / 60 /60
           const minutes = (time - (hours * 60 * 60)) /  60
           const c = hours > 12 ? 12 : 0
           return `${hours.toFixed(0) - c}:${minutes.toFixed(0) == 0 ? "00" : minutes.toFixed(0) } ${c == 12 ? "pm" : "am"}`
        }
        return (
            <div className="card-item">
                <div className="button-overlay">
                <button className="btn btn-favourite" title="Favourite" ><i className="fa fa-star"></i></button>
                <button className="btn btn-edit" title="Edit" ><i className="fa fa-pencil"></i></button>
                    <button className="btn btn-delete" title="Delete" onClick={() => deleteCard(_id)}><i className="fa fa-trash"></i></button>
                </div>

                <div className="card-title">
                {name}
                </div>


                <div className="card-body">
                <strong>Schedule</strong>
                {time.map((_, i) =>
                    <p>{_.day} | {changeToString(_.start)} - {changeToString(_.end)}</p>
                )}
                </div>
                <style>
                    {`
                        .card-item:hover .button-overlay{
                            display: flex !important;
                        }
                        .btn-edit {
                            background: gray;
                            color: #fff;
                            margin-right: 0.5em;
                        }
                        .btn-delete {
                            color: #fff;
                            // padding: 1em;
                            width: 40px;
                            background: red;
                            opacity: 1 !important;
                            margin-right: 0.5em;
                            margin-bottom: 0.5em;
                        }
                        .btn-favourite {
                            color: #fff;
                            // padding: 1em;
                            width: 40px;
                            background: #a2d7fa;
                            opacity: 1 !important;
                            margin-right: 0.5em;
                        }
                        .button-overlay {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            display:none !important;
                            align-items: flex-end;
                            justify-content: flex-end;
                            border-radius: 10px;
                            flex-direction: column;
                        }
                        .card-item {
                            position: relative;
                            margin: 2em 2em 0 0;
                            width: 200px;
                            padding: 1em;
                            border: 1px solid #999999;
                            border-radius: 10px;
                            min-height: 250px;
                        }
                        .card-title {
                            width: 100%;
                            font-weight: bold;
                            font-size: 1.3em;
                            color: #02633c;
                        }
                        .card-body {
                            margin-top: 1em;
                            width: 100%;
                            font-size: 0.8em;
                        }
                    `}
                </style>
            </div>
        )
    }
}
