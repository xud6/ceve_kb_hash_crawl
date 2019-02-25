import { KbGather } from './KbGather'
import { typeormdb } from './db'
import { tConfig } from './types/config';

import { config, loadKms } from './config'

class ceveKMGather {
    db: typeormdb
    KbGather: KbGather
    intervalSlow: NodeJS.Timeout
    constructor(readonly config: tConfig) {
        this.db = new typeormdb(config.database)
        this.KbGather = new KbGather({ db: this.db })
    }
    async init() {
        await this.db.inited;

        this.intervalSlow = setInterval(() => {
            this.KbGather.loadKmInfo(this.config.autoload.amount);
        }, 1000 * 60 * this.config.autoload.interval_m)
    }
    async loadKms(amount: number, afterId?: number) {
        await this.KbGather.loadKmInfo(amount, afterId); //100000
    }
}

let service = new ceveKMGather(config)
async function start() {
    await service.init()
    if (loadKms.loadOnstart && loadKms.amount) {
        console.log(`start loading kms after ${loadKms.afterId} amount ${loadKms.amount}`)
        service.loadKms(loadKms.amount, loadKms.afterId)
    }
}

start()