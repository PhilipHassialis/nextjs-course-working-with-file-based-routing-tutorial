import React, { useRef } from "react";
import Button from "../ui/button";
import classes from "./EventSearch.module.css";

const EventSearch = (props) => {
    const months = [
        { id: 1, label: "January" },
        { id: 2, label: "February" },
        { id: 3, label: "March" },
        { id: 4, label: "April" },
        { id: 5, label: "May" },
        { id: 6, label: "June" },
        { id: 7, label: "July" },
        { id: 8, label: "August" },
        { id: 9, label: "September" },
        { id: 10, label: "October" },
        { id: 11, label: "November" },
        { id: 12, label: "December" },
    ];

    const yearInputRef = useRef();
    const monthInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const year = yearInputRef.current.value;
        const month = monthInputRef.current.value;

        props.onSearch(year, month);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select name="" id="year" ref={yearInputRef}>
                        {[2020, 2021, 2022, 2023].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select name="" id="month" ref={monthInputRef}>
                        {months.map((month) => (
                            <option key={month.id} value={month.id}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
};

export default EventSearch;
