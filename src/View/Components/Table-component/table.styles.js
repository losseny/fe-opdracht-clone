import {css} from "lit";

export const TableStyles = css`

    table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        border-radius: 25px;
    }

    table tbody td, .table thead th {
        border: 1px solid #ddd;
        padding: 8px;
    }
    
    table tr:hover {background-color: #ddd;}

    table thead th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
    }

    h1, h2 {
        color: #00C300 !important;
        font-size: 46px;
        font-weight: bolder;
        text-align: center;
    }
`