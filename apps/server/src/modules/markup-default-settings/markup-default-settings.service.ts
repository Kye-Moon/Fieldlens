import {Injectable} from '@nestjs/common';
import {CreateMarkupDefaultSettingInput} from './dto/create-markup-default-setting.input';
import {UpdateMarkupDefaultSettingInput} from './dto/update-markup-default-setting.input';
import {RequestService} from "../request/request.service";
import {MarkupDefaultSettingsRepository} from "./markup-default-settings.repository";

@Injectable()
export class MarkupDefaultSettingsService {
    constructor(
        private readonly request: RequestService,
        private readonly markupDefaultSettingRepository: MarkupDefaultSettingsRepository,
    ) {
    }

    async create(createMarkupDefaultSettingInput: CreateMarkupDefaultSettingInput) {
        return await this.markupDefaultSettingRepository.createMarkupDefaultSettings({
            userId: "ff1ad323-d1c1-4981-b5d6-b447633f0468",
            ...createMarkupDefaultSettingInput
        });
    }

    findAll() {
        return `This action returns all markupDefaultSettings`;
    }

    async findUserDefaults() {
        return await this.markupDefaultSettingRepository.findUserDefaults();
    }

    async update(id: string, updateMarkupDefaultSettingInput: UpdateMarkupDefaultSettingInput) {
        return await this.markupDefaultSettingRepository.updateMarkupDefaultSettings(id, updateMarkupDefaultSettingInput);
    }

    remove(id: string) {
        return `This action removes a #${id} markupDefaultSetting`;
    }
}
