export function GET(req: Request) {
    console.log('Hello From the Server😁');
    
    return Response.json({Hello:'World!'})
}