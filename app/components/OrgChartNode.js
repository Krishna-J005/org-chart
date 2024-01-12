import React, { Fragment } from "react";
import { PiUser } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";


import './style.css';

const OrgChartNode = ({ data }) => {
    const customSplit = (inputString) => {
        let resultArray = inputString.split(',');
        if (resultArray.length === 1) {
            resultArray = inputString.split(" ");
        }
        resultArray = resultArray.filter(item => item != 'and');
        return resultArray;
    }

    return (
        <div className="org-tree">
            <ul>
                {data.map((item, index) => (
                    <Fragment key={index}>
                        <li>
                            <div className="card">
                                <div className="image icon-background">
                                    <PiUser size={30} color="#9e4eef" />
                                </div>
                                {item.email !== "" && <div className="caret"><i class="arrow down"></i></div>}

                                <div className="card-body">
                                    <div className="edit-btn">
                                        <MdOutlineEdit />
                                    </div>
                                    <div className="h5">{item.name}</div>
                                    {item.email !== "" &&
                                        <div class="grid-container">
                                            <div class="column right-aligned-items">
                                                <div class="item key-bg-class">Role</div>
                                                <div class="item key-bg-class">Team</div>
                                            </div>
                                            <div class="column left-aligned-items">
                                                <div class="item">{customSplit(item.designation)[0]}</div>
                                                <div class="item">{customSplit(item.designation).slice(1).toString()}</div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                            {item.children?.length > 0 && <OrgChartNode data={item.children} />}
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
};

export default OrgChartNode;