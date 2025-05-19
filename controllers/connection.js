import { addClient, removeClient } from './sse-clients.js';

export default async function RealTimeConnection(req,res){
    try{
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders?.(); // optional but helpful in some setups

        addClient(res);
        
        req.on('close', () => {
          removeClient(res);
        });

    } catch(error){
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}