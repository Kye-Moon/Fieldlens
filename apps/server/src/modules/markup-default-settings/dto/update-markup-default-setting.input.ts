import {CreateMarkupDefaultSettingInput} from './create-markup-default-setting.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMarkupDefaultSettingInput extends PartialType(CreateMarkupDefaultSettingInput) {
  @Field(() => String)
  id: string;
}
