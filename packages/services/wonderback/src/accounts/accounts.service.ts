import { Injectable } from '@nestjs/common';
import { QueryService } from '../queries.service.js';

@Injectable()
export class AccountsService {
    constructor(private readonly queries: QueryService) {}
}
