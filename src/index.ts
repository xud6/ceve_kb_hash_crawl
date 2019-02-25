import { KbGather } from './KbGather'
import { typeormdb } from './db'
import { tConfig } from './types/config';

import { config } from './config'

class ceveKMGather {
    db: typeormdb
    KbGather: KbGather
    intervalSlow: NodeJS.Timeout
    constructor(config: tConfig) {
        this.db = new typeormdb(config.database)
        this.KbGather = new KbGather({ db: this.db })
    }
    async init() {
        await this.db.inited;

        this.intervalSlow = setInterval(() => {
            this.KbGather.loadKmInfo(10);
        }, 1000 * 60 * 60 * 24)
    }
    async loadKms(amount: number, afterId?: number) {
        await this.KbGather.loadKmInfo(amount, afterId); //100000
    }
}

let service = new ceveKMGather(config)
async function start() {
    await service.init()
    if (config.loadKms.amount) {
        service.loadKms(config.loadKms.amount, config.loadKms.afterId)
    }
}

start()