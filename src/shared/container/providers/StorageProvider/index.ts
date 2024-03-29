import { container } from "tsyringe";

import { IStorageProvider } from "./IStorageProvider";
import { LocalStorageProvider } from "./Implementations/LocalStorageProvider";
import { S3StorageProvider } from "./Implementations/S3StorageProvider";

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk],
);
