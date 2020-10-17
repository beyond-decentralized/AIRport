/**
 * Created by Papa on 5/26/2016.
 */
declare namespace gapi.client.drive.files {
    interface FileRef {
        fileId: string;
        fields?: string;
    }
    interface DirRef {
        spaces?: string;
        fields?: string;
        pageSize?: number;
        pageToken?: string;
        q?: string;
    }
    interface FileMetadata {
        name: string;
        mimeType: string;
        parents?: string[];
    }
    interface CreateDescriptor {
        resource: FileMetadata;
        fields: string;
    }
    function create(createDescriptor: CreateDescriptor): Promise<any>;
    function list(dirRef?: DirRef): Promise<any>;
    function get(fileRef: FileRef): any;
}
//# sourceMappingURL=GoogleDriveNamespace.d.ts.map