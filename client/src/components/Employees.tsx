import React from "react"

function Employees() {
    return (
        <>
            <div className="flex-container">
                <div className="wrapper">
                    <div className="cell">#</div>
                    <div className="cell">name</div>
                    <div className="cell">last name</div>
                    <div className="cell">company</div>
                    <div className="cell">date of adding</div>
                    {/* {(data ?? []).map((department) => (
                        <div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                        </div>
                    ))} */}

                </div>
            </div>

        </>
    )
}

export default Employees;