using GameNight.Models;
using GameNight.Services;
using Xunit;

namespace GameNight.Tests;

public class HungarianTimeTests
{
    [Fact]
    public void Summer_and_winter_local_times_convert_to_utc()
    {
        Assert.True(HungarianTime.TryParseLocal("2030-07-01T19:00", out var summer, out _));
        Assert.Equal(new DateTime(2030, 7, 1, 17, 0, 0), summer);
        Assert.True(HungarianTime.TryParseLocal("2030-01-15T19:00", out var winter, out _));
        Assert.Equal(new DateTime(2030, 1, 15, 18, 0, 0), winter);
    }

    [Theory]
    [InlineData("2030-03-31T02:30")] // tavaszi átállás: nem létező időpont
    [InlineData("2030-10-27T02:30")] // őszi átállás: kétértelmű időpont
    [InlineData("nem dátum")]
    [InlineData("")]
    public void Missing_ambiguous_or_invalid_local_times_are_errors(string input)
    {
        Assert.False(HungarianTime.TryParseLocal(input, out _, out var error));
        Assert.False(string.IsNullOrEmpty(error));
    }
}

public class PlatformAndCodeTests
{
    [Theory]
    [InlineData("PC", true)]
    [InlineData("Switch", true)]
    [InlineData("pc", false)]
    [InlineData("Atari", false)]
    public void Only_listed_platforms_are_allowed(string value, bool allowed) =>
        Assert.Equal(allowed, Platforms.IsAllowed(value));

    [Fact]
    public void Generated_codes_are_unique_and_verify_regardless_of_formatting()
    {
        var a = WithdrawalCodes.Generate();
        var b = WithdrawalCodes.Generate();
        Assert.NotEqual(a, b);
        var hash = WithdrawalCodes.Hash(a);
        Assert.True(WithdrawalCodes.Verify(a.ToLowerInvariant().Replace("-", " "), hash));
        Assert.False(WithdrawalCodes.Verify(b, hash));
        Assert.False(WithdrawalCodes.Verify(null, hash));
        Assert.False(WithdrawalCodes.Verify(a, null));
    }
}
