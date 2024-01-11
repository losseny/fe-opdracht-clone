import {css} from "lit";

export const JourneyStyles = css`
    .itinerary {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 47vw;
        min-height: 90px;
        margin: 4px;
    }

    body {
        font-family: 'Arial', sans-serif;
        background: #f5f5f5;
        margin: 0;
        padding: 20px;
        font-size: 14px;
    }

    .itinerary-container > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .event {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding: 10px 15px;
    }

    .event:last-child {
        border-bottom: 0;
    }

    .time {
        font-size: 18px;
        color: #333;
        width: 50px;
    }

    .details {
        flex-grow: 1;
        padding-left: 10px;
    }

    .location {
        font-weight: bold;
    }

    .address {
        color: #666;
        font-size: 12px;
    }

    .activity {
        color: #333;
        font-size: 12px;
    }

    .edit {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        font-size: 14px;
    }

    .edit:focus {
        outline: none;
    }

    .edit:hover .itinerary {
        outline: none;
        background: #eceaea;
    }

    .flight {
        background-color: #f0f0f0;
    }


    .test {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
    }

    .AUkJgf {
        visibility: visible;
        height: 29px;
        padding: 8px 0 0 25px;
        width: 24px;
    }

    .PLEQOe.lECG9c {
        background-image: url(//maps.gstatic.com/consumer/images/icons/1x/start_location_grey800_18dp.png);
        background-size: 18px 18px;
        background-position-x: 3px;
        margin-bottom: 1px;
    }

    .PLEQOe {
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
    }

    .PLEQOe.IeZuN {
        background-image: url(//maps.gstatic.com/consumer/images/icons/1x/route_3dots_grey650_24dp.png);
        background-size: 24px 24px;
        width: 100%;
        height: 100%;
        object-fit: contain; /* or 'cover', depending on the desired effect */

    }

`