import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {SearchUserInput} from "./dto/search-user.input";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {UserOrganisation} from "../user-organisation/entities/user-organisation.entity";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly userOrganisationService: UserOrganisationService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.invite(createUserInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [User], {name: 'searchUsers'})
    searchUsers(@Args('userSearchInput') searchInput: SearchUserInput) {
        return []
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    initialiseUser() {
        return this.userService.initialise();
    }

    @UseGuards(AuthGuard)
    @Query(() => User, {name: 'user'})
    findOne(@Args('id', {type: () => String}) id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Query(() => User, {name: 'currentUser'})
    currentUser() {
        return this.userService.currentUser();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.userService.remove(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => UserOrganisation)
    async userOrganisation(@Parent() user: User) {
        const {id} = user;
        return await this.userOrganisationService.getCurrentUserOrganisationByUserId(id);
    }
}
