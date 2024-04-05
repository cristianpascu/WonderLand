import { Controller } from '@nestjs/common';
import { AccountsService } from './accounts.service.js';

@Controller('/accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}
}
