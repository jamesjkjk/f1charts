// openf1.route.ts
import { Router } from 'express';
import fetch from 'node-fetch';
const router = Router();
//chagne this to meetings and not seessions. there should be asessions object though
router.get('/meetings', async (req, res) => {
    const { year, country_name } = req.query;
    let url = `https://api.openf1.org/v1/meetings?year=${year}`;
    if (country_name) {
        url += `&country_name=${country_name}`;
    }
    try {
        const data = await fetchData(url);
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
router.get('/sessions', async (req, res) => {
    const { meeting_key } = req.query;
    let url = `https://api.openf1.org/v1/sessions?meeting_key=${meeting_key}`;
    try {
        const data = await fetchData(url);
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
router.get('/drivers', async (req, res) => {
    const { session_key } = req.query;
    let url = `https://api.openf1.org/v1/drivers?session_key=${session_key}`;
    try {
        const data = await fetchData(url);
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
router.get('/laps', async (req, res) => {
    const { session_key } = req.query;
    let url = `https://api.openf1.org/v1/laps?session_key=${session_key}`;
    try {
        const data = await fetchData(url);
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
router.get('/car_data', async (req, res) => {
    const { driver_number, session_key, date_start, date_end } = req.query;
    if (!driver_number) {
        res.status(400).json({ error: "A driver has not been selected" });
    }
    if (!session_key) {
        res.status(400).json({ error: "A session has not been selected" });
    }
    if (!date_start) {
        res.status(400).json({ error: "A Start Date has not been selected" });
    }
    if (!date_end) {
        res.status(400).json({ error: "A End Date has not been selected" });
    }
    let url = `https://api.openf1.org/v1/car_data?driver_number=${driver_number}&session_key=${session_key}&date>=${date_start}&date<=${date_end}`;
    console.log(url);
    try {
        const data = await fetchData(url);
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default router;
