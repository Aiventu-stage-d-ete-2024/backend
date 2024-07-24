import Counters from '../model/countersModel.js';
import Assets from '../model/assetsModel.js';
import moment from 'moment';


export async function getAllCounters(req, res) {
    try {
        const counters = await Counters.find();

        // Fetch all assets once to avoid multiple database queries
        const assetIds = counters.map(counter => counter.Asset).filter(Boolean);
        const functionalLocationIds = counters.map(counter => counter.FunctionalLocation).filter(Boolean);
        const uniqueIds = [...new Set([...assetIds, ...functionalLocationIds])];

        const assets = await Assets.find({ AssetID: { $in: uniqueIds } }).lean();
        const assetMap = assets.reduce((acc, asset) => {
            acc[asset.AssetID] = asset;
            return acc;
        }, {});

        const formattedCounters = counters.map(counter => {
            const formattedCounter = {
                ...counter.toObject(),
                Asset: assetMap[counter.Asset] ? assetMap[counter.Asset].Name : null,
                FunctionalLocation: assetMap[counter.FunctionalLocation] ? assetMap[counter.FunctionalLocation].Name : null,
                AssetID: undefined 
            };
            formattedCounter.Registered = formattedCounter.Registered ? moment(formattedCounter.Registered).format('M/D/YYYY h:mm:ss A') : null;
            return formattedCounter;
        });

        res.status(200).json({ counters: formattedCounters });
    } catch (error) {
        console.error('Error fetching counters:', error);
        res.status(500).json({ message: 'Server error' });
    }
}




export async function createCounter(req, res) {
    const {CounterID,AssetID,Counter,CounterReset, 
        Registered,Value,Unit,AggregatedValue,Totals,} = req.body;

    try {
        let asset;
        if (AssetID) {
            asset = await Assets.findOne({ AssetID });
        } else if (AssetName) {
            asset = await Assets.findOne({ Name: AssetName });
        } else {
            return res.status(400).json({ message: 'AssetID or AssetName is required' });
        }
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const newCounters = new Counters({
            CounterID,Asset: asset.AssetID,FunctionalLocation: asset.FunctionalLocation,
            Counter,CounterReset,Registered,Value,Unit,AggregatedValue,Totals,});
        await newCounters.save();
        res.status(201).json({ counter: newCounters });
    } catch (error) {
        console.error('Error creating counter:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateCounter(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCounter = await Counters.findByIdAndUpdate(id, updatedData, { new: true });
        console.log('Updating counter with data:', req.body);
        if (!updatedCounter) {
            return res.status(404).json({ message: 'Counter not found' });
        }

        res.status(200).json(updatedCounter);
    } catch (error) {
        console.error('Error updating counter:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



/*export async function getCountersById(req, res) {
    try {
        const { id } = req.params;
        const counter = await Counters.findById(id);
        if (!counter) {
            return res.status(404).json({ message: 'Counters not found' });
        }
        const formattedCounter = {
            ...counter.toObject(),
            AssetName: counter.Asset,
            Asset: undefined 
        };
        formattedCounter.Registered = formattedCounter.Registered ? moment(formattedCounter.Registered).format('M/D/YYYY h:mm:ss A') : null;
        res.status(200).json(formattedCounter);
    } catch (error) {
        console.error('Error fetching counter by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}*/

export async function getCounterByCounterID(req, res) {
    try {
        const { CounterID } = req.params;
        const counter = await Counters.findOne({ CounterID: CounterID });

        if (!counter) {
            return res.status(404).json({ message: 'counter not found' });
        }

        res.status(200).json(counter);
    } catch (error) {
        console.error('Error fetching counter by CounterID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteCounter(req, res) {
    try {
        const { id } = req.params;
        const deletedcounter = await Counters.findByIdAndDelete(id);
        
        if (!deletedcounter) {
            return res.status(404).json({ message: 'counter not found' });
        }

        res.status(200).json({ message: 'counter deleted successfully' });
    } catch (error) {
        console.error('Error deleting counter:', error);
        res.status(500).json({ message: 'Server error' });
    }
}