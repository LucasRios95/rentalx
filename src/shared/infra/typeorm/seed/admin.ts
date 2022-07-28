import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    console.log(connection);
    await connection.query(
        `INSERT INTO USER (id, name, email, password, "isAdmin", created_at, driver_license ) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
