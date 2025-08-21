import React, { useState, useEffect } from 'react';

const Deal = () => {
    // Set the end date for the countdown (e.g., 5 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5); // 5 days from now
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer); // Clear timer on component unmount
    }, []);
    return (
        <section class="padding-bottom">
            <section class="padding-bottom">
                <div class="card card-deal">
                    <div class="col-heading content-body">
                        <header class="section-heading">
                            <h3 class="section-title">Deals and offers</h3>
                            <p>Hygiene equipments</p>
                        </header>
                        <div class="timer">
                            <div> <span class="num">{timeLeft.days || '00'}</span> <small>Days</small></div>
                            <div> <span class="num">{timeLeft.hours || '00'}</span> <small>Hours</small></div>
                            <div> <span class="num">{timeLeft.minutes || '00'}</span> <small>Min</small></div>
                            <div> <span class="num">{timeLeft.seconds || '00'}</span> <small>Sec</small></div>
                        </div>
                    </div> 
                    <div class="row no-gutters items-wrap">
                        <div class="col-md col-6">
                            <figure class="card-product-grid card-sm">
                                <a href="#" class="img-wrap"> 
                                    <img src="images/items/3.jpg" alt="Product 1" /> 
                                </a>
                                <div class="text-wrap p-3">
                                    <a href="#" class="title">Summer clothes</a>
                                    <span class="badge badge-danger"> -20% </span>
                                </div>
                            </figure>
                        </div> 
                        <div class="col-md col-6">
                            <figure class="card-product-grid card-sm">
                                <a href="#" class="img-wrap"> 
                                    <img src="images/items/4.jpg" alt="Product 2" /> 
                                </a>
                                <div class="text-wrap p-3">
                                    <a href="#" class="title">Some category</a>
                                    <span class="badge badge-danger"> -5% </span>
                                </div>
                            </figure>
                        </div> 
                        <div class="col-md col-6">
                            <figure class="card-product-grid card-sm">
                                <a href="#" class="img-wrap"> 
                                    <img src="images/items/5.jpg" alt="Product 3" /> 
                                </a>
                                <div class="text-wrap p-3">
                                    <a href="#" class="title">Another category</a>
                                    <span class="badge badge-danger"> -20% </span>
                                </div>
                            </figure>
                        </div> 
                        <div class="col-md col-6">
                            <figure class="card-product-grid card-sm">
                                <a href="#" class="img-wrap"> 
                                    <img src="images/items/6.jpg" alt="Product 4" /> 
                                </a>
                                <div class="text-wrap p-3">
                                    <a href="#" class="title">Home apparel</a>
                                    <span class="badge badge-danger"> -15% </span>
                                </div>
                            </figure>
                        </div> 
                        <div class="col-md col-6">
                            <figure class="card-product-grid card-sm">
                                <a href="#" class="img-wrap"> 
                                    <img src="images/items/7.jpg" alt="Product 5" /> 
                                </a>
                                <div class="text-wrap p-3">
                                    <a href="#" class="title text-truncate">Smart watches</a>
                                    <span class="badge badge-danger"> -10% </span>
                                </div>
                            </figure>
                        </div> 
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Deal;