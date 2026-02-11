#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol,
};

#[contracttype]
#[derive(Clone)]
pub struct Campaign {
    pub owner: Address,
    pub goal: i128,
    pub total: i128,
    pub active: bool,
}

const CAMPAIGN: Symbol = symbol_short!("CAMP");

#[contract]
pub struct Crowdfund;

#[contractimpl]
impl Crowdfund {
    pub fn init(env: Env, owner: Address, goal: i128) {
        if env.storage().instance().has(&CAMPAIGN) {
            panic!("Already initialized");
        }

        let campaign = Campaign {
            owner,
            goal,
            total: 0,
            active: true,
        };

        env.storage().instance().set(&CAMPAIGN, &campaign);

        env.events().publish(("init",), goal);
    }

    pub fn donate(env: Env, from: Address, amount: i128) {
        from.require_auth();

        let mut campaign: Campaign =
            env.storage().instance().get(&CAMPAIGN).unwrap();

        if !campaign.active {
            panic!("Campaign closed");
        }

        campaign.total += amount;

        env.storage().instance().set(&CAMPAIGN, &campaign);

        env.events().publish(("donate", from), amount);
    }

    pub fn get_total(env: Env) -> i128 {
        let campaign: Campaign =
            env.storage().instance().get(&CAMPAIGN).unwrap();

        campaign.total
    }

    pub fn close(env: Env, caller: Address) {
        caller.require_auth();

        let mut campaign: Campaign =
            env.storage().instance().get(&CAMPAIGN).unwrap();

        if caller != campaign.owner {
            panic!("Only owner");
        }

        campaign.active = false;

        env.storage().instance().set(&CAMPAIGN, &campaign);

        env.events().publish(("closed",), campaign.total);
    }
}
