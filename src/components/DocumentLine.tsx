import { useStore } from "@/store";

const DocumentLine = () => {

    return (
        <>
        {
            useStore().selectedPost?.lines?.map(line => {
                return (
                    <div class="document-line" key={line?.id}
                    id={`documentLine${line?.id}`}>
                        {
                            line?.text === "<br>" ? <br /> : line?.text
                        }
                    </div>
                )
            })
        }
        </>
    )
}

export default DocumentLine;