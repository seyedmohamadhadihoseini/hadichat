
import SideBarDashboards from "@/components/general/sidebar";
import { UserDataProvider } from "@/hooks/use-userData";
import ReactReduxProvider from "@/lib/redux/provider";
import { WebSocketProvider } from "@/lib/websocket/context";

import GetCurrentUser from "@/services/getUser";




export default async function ChatLayout({ children }: {
    children: React.ReactNode,
}) {

    const user = await GetCurrentUser();
    if (!user) {
        return <div>user not exists</div>
    }

    return <WebSocketProvider user={user}>
        <UserDataProvider user={user}>
            <ReactReduxProvider>
                <SideBarDashboards>
                    {children}

                </SideBarDashboards>
            </ReactReduxProvider>
        </UserDataProvider>

    </WebSocketProvider>
}   