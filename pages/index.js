import React from "react";
import { featuredEvents } from "../dummy-data";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>The homepage</h1>
        </div>
    );
};

export default HomePage;
