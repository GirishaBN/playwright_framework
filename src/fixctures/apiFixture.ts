import {test as base} from '@playwright/test'
import { ApiHelper } from "../../utils/ApiHelper";
import { config } from '../../config/env';

type ApiFixture={
apiHelper:ApiHelper;
}
export let test=base.extend<ApiFixture>({
    apiHelper:async({request},use)=>{
        console.log(config.apiBaseUri);
        let apiHelper =new ApiHelper(request,config.apiBaseUri!);
        await use(apiHelper);
    }
})

export {expect} from '@playwright/test'