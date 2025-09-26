import { Button } from "@/components/ui/button";
export default function SubmitButtonComponent({ loading }: { loading: boolean }) {

    return (
        <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "in process..." : "register"}
        </Button>
    );
}