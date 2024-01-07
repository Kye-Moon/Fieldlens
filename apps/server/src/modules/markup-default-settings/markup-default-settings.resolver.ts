import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {MarkupDefaultSettingsService} from './markup-default-settings.service';
import {MarkupDefaultSetting} from './entities/markup-default-setting.entity';
import {CreateMarkupDefaultSettingInput} from './dto/create-markup-default-setting.input';
import {UpdateMarkupDefaultSettingInput} from './dto/update-markup-default-setting.input';

@Resolver(() => MarkupDefaultSetting)
export class MarkupDefaultSettingsResolver {
  constructor(private readonly markupDefaultSettingsService: MarkupDefaultSettingsService) {}

  @Mutation(() => MarkupDefaultSetting)
  createMarkupDefaultSetting(@Args('createMarkupDefaultSettingInput') createMarkupDefaultSettingInput: CreateMarkupDefaultSettingInput) {
    return this.markupDefaultSettingsService.create(createMarkupDefaultSettingInput);
  }

  @Query(() => MarkupDefaultSetting, { name: 'userMarkupDefaults' })
  findUserDefaults() {
    return this.markupDefaultSettingsService.findUserDefaults();
  }

  @Mutation(() => MarkupDefaultSetting)
  updateMarkupDefaultSetting(@Args('updateMarkupDefaultSettingInput') updateMarkupDefaultSettingInput: UpdateMarkupDefaultSettingInput) {
    return this.markupDefaultSettingsService.update(updateMarkupDefaultSettingInput.id, updateMarkupDefaultSettingInput);
  }

  @Mutation(() => MarkupDefaultSetting)
  removeMarkupDefaultSetting(@Args('id', { type: () => String }) id: string) {
    return this.markupDefaultSettingsService.remove(id);
  }
}
