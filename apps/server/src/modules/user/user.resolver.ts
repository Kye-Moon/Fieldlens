import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {SearchUserInput} from "./dto/search-user.input";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guards";

import {Organisation} from "../organisation/entities/organisation.entity";
import {OrganisationService} from "../organisation/organisation.service";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly organisationService: OrganisationService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.inviteUser(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [User], {name: 'searchUsers'})
    searchUsers(@Args('userSearchInput') searchInput: SearchUserInput) {
        return []
    }

    @Query(() => User, {name: 'user'})
    findOne(@Args('id', {type: () => String}) id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User, {name: 'currentUser'})
    currentUser() {
        return this.userService.currentUser();
    }


    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.userService.remove(id);
    }

    @ResolveField(() => [Organisation])
    organisation(@Parent() user: User) {
        const {organisationId} = user;
        return this.organisationService.findOne(organisationId);
    }
}
