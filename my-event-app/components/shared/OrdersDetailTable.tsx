import { OrdersDetailTableType } from "@/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { formatDateTime } from "@/lib/utils"
  
const OrdersDetailTable = ({type, orders}: OrdersDetailTableType) => {
    return(
        <Table className="w-full border-collapse border-t">
            <TableHeader>
                <TableRow className="p-medium-14 border-b text-grey-500">
                <TableHead className="min-w-[250px] py-3 text-left">OrderId</TableHead>
                <TableHead className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event</TableHead>
                {type === "Orders of event" ? <TableHead className="min-w-[150px] py-3 text-left">Customer</TableHead> : null}
                <TableHead className="min-w-[100px] py-3 text-left">Ticket Amount</TableHead>
                <TableHead className="min-w-[100px] py-3 text-right">Order Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map((order) => (
                        <TableRow key={order.orderId} className="p-regular-14 lg:p-regular-16 border-b">
                            <TableCell className="min-w-[250px] py-4 text-primary-500">{order.orderId}</TableCell>
                            <TableCell className="min-w-[200px] flex-1 py-4 pr-4"><Link href={`/events/${order.event.eventObjId}`}>{order.event.title}</Link></TableCell>
                            {type === "Orders of event" ? <TableCell className="min-w-[150px] py-4"><Link href={`/profile/${order.customer.clerkId}`}>{order.customer.username}</Link></TableCell> : null}
                            <TableCell className="min-w-[100px] py-4">{order.ticketAmount}</TableCell>
                            <TableCell className="min-w-[100px] py-4 text-right">{formatDateTime(order.createdAt).dateTime}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    )
}

export default OrdersDetailTable
