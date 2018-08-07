#include "TrackerPool.hpp"

namespace hodlong {
    void TrackerPool::add(account_name account, string& tracker_url){
        require_auth(account);

        trackerIndex  trackers(_self, _self);
        auto iterator = trackers.find(account);
        eosio_assert(iterator == trackers.end(), "A tracker is already configured for this account.");

        trackers.emplace(account, [&](auto &tracker)){
            tracker.account_name = account;
            tracker.url = tracker_url;
        }

    }
    void TrackerPool::remove(account_name account, string& tracker_url){
        require_auth(account);

        trackerIndex  trackers(_self, _self);
        auto iterator = trackers.find(account);
        eosio_assert(iterator != trackers.end(), "A tracker doesn't exist for this account.");

        trackers.erase(iterator);
    }
    void TrackerPool::update(account_name account, string& tracker_url){
        require_auth(account);

        trackersIndex trackers(_self, _self);

        auto iterator = trackers.find(account);
        eosio_assert(iterator != trackers.end(), "A tracker doesn't exist for this account.");

        trackers.modify(iterator, account, [&](auto& trackers) {
            trackers.url = url;
        });
    }
}